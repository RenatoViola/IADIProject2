package pt.unl.fct.di.project.presentation.controllers

import org.junit.jupiter.api.Test
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.BeforeEach
import org.springframework.security.test.context.support.WithMockUser

import pt.unl.fct.di.project.ProjectApplication
import pt.unl.fct.di.project.domain.UserRepository
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.transaction.annotation.Transactional
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.domain.PeriodRepository
import pt.unl.fct.di.project.domain.ReservationRepository
import java.time.LocalDate
import java.util.*

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ClientControllerMockitoTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var clients: UserRepository

    @MockBean
    lateinit var reservations: ReservationRepository

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    lateinit var apartmentWithPeriods: ApartmentDAO

    @BeforeEach
    fun setUp() {
        objectMapper.registerModule(JavaTimeModule())
    }

    @BeforeEach
    fun addPeriods(){
        apartmentWithPeriods = ApartmentDAO(
                id = 2, // Replace with a valid apartment ID
                name = "Sample Apartment",
                description = "Description for Sample Apartment",
                location = "Sample Location",
                amenities = "Sample Amenities",
                pictureUrl = "http://example.com/pictures/sampleApartment.jpg",
                pricePerNight = 150,
                owner = OwnerDAO(
                        username = "sampleOwner",
                        password = "sampleOwner123",
                        email = "owner@email.com",
                        pictureUrl = "http://example.com/pictures/owner.jpg",
                        phoneNumber = "987-654-3210",
                        apartments = mutableListOf()
                ),
                periods = mutableListOf(),
                reservations = mutableListOf()  // You can leave this as an empty list for now
        )

        val periodOne = PeriodDAO(
                apartmentId = apartmentWithPeriods.id,
                startDate = LocalDate.of(2023, 3, 1),
                endDate = LocalDate.of(2023, 3, 15),
                apartment = null
        )

        val periodTwo = PeriodDAO(
                apartmentId = apartmentWithPeriods.id,
                startDate = LocalDate.of(2023, 3, 16),
                endDate = LocalDate.of(2023, 3, 25),
                apartment = null
        )

        apartmentWithPeriods.periods.addAll(listOf(periodOne, periodTwo))

    }

    companion object {
        val listClients = mutableListOf<UserDAO>()

        init {
            // Initialize some sample clients for testing
            val clientOne = ClientDAO(
                    username = "johnDoe",
                    password = "johnDoe123",
                    email = "john.doe@email.com",
                    pictureUrl = "http://example.com/pictures/johnDoe.jpg",
                    phoneNumber = "123-456-7890",
                    reservations = mutableListOf()
            )
            val clientTwo = ClientDAO(
                    username = "client_two",
                    password = "client_password",
                    email = "client2@example.com",
                    pictureUrl = "http://example.com/client_two.jpg",
                    phoneNumber = "987-654-3210",
                    reservations = mutableListOf()
            )
            listClients.addAll(listOf(clientOne, clientTwo))
        }
    }
    @Test
    fun `get Clients`() {

        Mockito.`when`(clients.findByRole(Role.CLIENT)).thenReturn(listClients)

        mockMvc.perform(get("/clients"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize<Any>(listClients.size)))
    }

    @Test
    fun `get Client`() {

        val clientUsername = "client_one"

        Mockito.`when`(clients.findById(clientUsername)).thenReturn(Optional.ofNullable(listClients.firstOrNull { it.username == clientUsername }))

        mockMvc.perform(get("/clients/$clientUsername"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("client_one"))
    }


    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun `add Reservation no`() {

        val clientId = 1L

        val reservationToAdd = ReservationDAO(
                startDate = LocalDate.of(2023, 3, 20),
                endDate = LocalDate.of(2023, 3, 24),
                client = ClientDAO(
                        username = "johnDoe",
                        password = "johnDoe123",
                        email = "john.doe@email.com",
                        pictureUrl = "http://example.com/pictures/johnDoe.jpg",
                        phoneNumber = "123-456-7890",
                        reservations = mutableListOf()
                ),
                apartment = apartmentWithPeriods,  // Set the apartment to the one you created
                history = mutableListOf(),
                review = null  // No review initially
        )

        Mockito.`when`(reservations.save(reservationToAdd)).thenReturn(reservationToAdd)

        val jsonString = objectMapper.writeValueAsString(reservationToAdd)

        mockMvc.perform(post("/clients/{clientUsername}/reservations", reservationToAdd.client.username)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString)
        )
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    @Test
    fun `publish Review`() {

        val review = ReviewDTO(
                text = "I liked it",
                rating = 2
        )

        val jsonString = objectMapper.writeValueAsString(review)

        mockMvc.perform(put("/clients/{clientUsername}/reservations/{reservationId}/reviews", "johnDoe", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(status().isOk)

    }
}