package pt.unl.fct.di.project.presentation.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers.`is`
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import pt.unl.fct.di.project.ProjectApplication
import java.time.LocalDate
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.hamcrest.Matchers
import org.junit.jupiter.api.BeforeEach
import org.springframework.boot.test.mock.mockito.MockBean
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.domain.UserRepository

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ClientControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        objectMapper.registerModule(JavaTimeModule())
    }

    @Test
    fun getClients() {
        mockMvc.perform(MockMvcRequestBuilders.get("/clients"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize<Any>(5)))
    }

    @Test
    fun getClient() {
        mockMvc.perform(MockMvcRequestBuilders.get("/clients/johnDoe"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("johnDoe"))
    }


    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun addReservation() {
        val reservation = ReservationDTO(
            startDate = LocalDate.of(2023, 1, 1),
            endDate = LocalDate.of(2023, 1, 5),
            client = CompactUserDTO("johnDoe", "john.doe@email.com"),
            apartment = CompactApartmentDTO(1, "Sunny Studio")
        )

        val jsonString = objectMapper.writeValueAsString(reservation)

        mockMvc.perform(
            MockMvcRequestBuilders.post("/clients/{username}/reservations", "johnDoe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$", `is`(3)))
    }


    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun publishReview() {
        val review = ReviewDTO(
            text = "I liked it",
            rating = 2
        )
        val jsonString = objectMapper.writeValueAsString(review)

        val result = mockMvc.perform(
                MockMvcRequestBuilders.put("/clients/{clientUsername}/reservations/{reservationId}/reviews", "johnDoe", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andReturn()

        val responseBody = result.response.contentAsString
        println("Response Body: $responseBody") // Print the response body to the console
    }

    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun `publish Review NotFound`() {
        val review = ReviewDTO(
                text = "I liked it",
                rating = 2
        )
        val jsonString = objectMapper.writeValueAsString(review)

        val result = mockMvc.perform(
                MockMvcRequestBuilders.put("/clients/{clientUsername}/reservations/{reservationId}/reviews", "johnDoe", 10)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isNotFound)
                .andReturn()

        val responseBody = result.response.contentAsString
        println("Response Body: $responseBody") // Print the response body to the console
    }

    @Test
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun `add Reservation forbidden`(){

        val reservation = ReservationDTO(
                startDate = LocalDate.of(2023, 1, 1),
                endDate = LocalDate.of(2023, 1, 5),
                client = CompactUserDTO("johnDoe", "john.doe@email.com"),
                apartment = CompactApartmentDTO(1, "Sunny Studio")
        )

        val jsonString = objectMapper.writeValueAsString(reservation)

        mockMvc.perform(
                MockMvcRequestBuilders.post("/clients/{username}/reservations", "alexWright")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isForbidden)
    }
}