package pt.unl.fct.di.project.presentation.controllers

import org.hamcrest.Matchers
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.mockito.Mock
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.transaction.annotation.Transactional
import pt.unl.fct.di.project.ProjectApplication
import pt.unl.fct.di.project.domain.ApartmentRepository
import pt.unl.fct.di.project.domain.ReservationRepository
import pt.unl.fct.di.project.domain.UserRepository
import pt.unl.fct.di.project.data.ReservationDAO
import pt.unl.fct.di.project.data.ClientDAO
import pt.unl.fct.di.project.data.ApartmentDAO
import pt.unl.fct.di.project.data.OwnerDAO
import java.time.LocalDate
import java.util.*

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ReservationControllerMockitoTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var reservationRepository: ReservationRepository



    companion object {
        val listReservations = mutableListOf<ReservationDAO>()

        init {
            val client = ClientDAO(
                    username = "clientUser",
                    password = "clientPass",
                    email = "client@example.com",
                    pictureUrl = "http://example.com/client.jpg",
                    phoneNumber = "987-654-3210",
                    reservations = mutableListOf()
            )
            val owner = OwnerDAO(
                    username = "ownerUser",
                    password = "ownerPass",
                    email = "owner@example.com",
                    pictureUrl = "http://example.com/owner.jpg",
                    phoneNumber = "123-456-7890",
                    apartments = mutableListOf()
            )
            val apartment = ApartmentDAO(
                    id = 1,
                    name = "Seaside Retreat",
                    description = "A lovely seaside apartment with great views.",
                    location = "Oceanview, 123 Beach Lane",
                    amenities = "Pool, WiFi, Balcony",
                    pictureUrl = "http://example.com/apartment1.jpg",
                    pricePerNight = 150,
                    owner = owner,
                    periods = mutableListOf(),
                    reservations = mutableListOf()
            )
            val reservationOne = ReservationDAO(
                    id = 1,
                    startDate = LocalDate.of(2023, 7, 10),
                    endDate = LocalDate.of(2023, 7, 15),
                    client = client,
                    apartment = apartment,
                    history = mutableListOf(),
                    review = null
            )
            val reservationTwo = ReservationDAO(
                    id = 2,
                    startDate = LocalDate.of(2023, 8, 5),
                    endDate = LocalDate.of(2023, 8, 12),
                    client = client,
                    apartment = apartment,
                    history = mutableListOf(),
                    review = null
            )

            listReservations.addAll(listOf(reservationOne, reservationTwo))
        }
    }

    @Test
    fun `get Reservations`() {
        Mockito.`when`(reservationRepository.findAll().toList()).thenReturn(listReservations)

        mockMvc.perform(get("/reservations"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize<Any>(2)))

    }

    @Test
    @Transactional
    @WithMockUser(username = "clientUser", password = "clientPass", roles = ["CLIENT"])
    fun `get Reservation`() {
        val reservationId = 1L

        Mockito.`when`(reservationRepository.findById(reservationId)).thenReturn(Optional.ofNullable(listReservations.firstOrNull{it.id == reservationId}))

        mockMvc.perform(get("/reservations/$reservationId"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(reservationId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.client.username").value("clientUser"))

    }

    @Test
    fun getStatusHistory() {
    }

    @Test
    fun getReview() {
    }

    @Test
    fun confirmReservation() {
    }

    @Test
    fun rejectReservation() {
    }

    @Test
    fun checkIn() {
    }

    @Test
    fun checkOut() {
    }
}