package pt.unl.fct.di.project.presentation.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
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

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ReservationControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        objectMapper.registerModule(JavaTimeModule())
    }
    @Test
    fun getReservations() {
        val result = mockMvc.perform(MockMvcRequestBuilders.get("/reservations"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize<Any>(2)))
                .andReturn()

        val responseBody = result.response.contentAsString
        println("Response Body: $responseBody") // Print the response body to the console
    }

    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun getReservation() {
        mockMvc.perform(MockMvcRequestBuilders.get("/reservations/1"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.client.username").value("johnDoe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.apartment.name").value("Sunny Studio"))
    }

    @Test
    @Transactional
    @WithMockUser(username = "alexWright", password = "alexPass", roles = ["OWNER"])
    fun getStatusHistory() {
        mockMvc.perform(MockMvcRequestBuilders.get("/reservations/{reservationId}/history", 2))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize<Any>(4)))
    }

    @Test
    fun getReview() {
        val result = mockMvc.perform(MockMvcRequestBuilders.get("/reservations/{reservationId}/reviews", 1))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.text").value("This apartment was great!")
                ).andReturn()

                        val responseBody = result.response.contentAsString
                println("Response Body: $responseBody")



    }

    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun `confirm Reservation Is Forbidden`() {
        mockMvc.perform(MockMvcRequestBuilders.put("/reservations/{reservationId}",1))
                .andExpect(MockMvcResultMatchers.status().isForbidden)
    }

    @Test
    @Transactional
    @WithMockUser(username = "alexWright", password = "alexPass", roles = ["OWNER"])
    fun `reject Reservation not found`() {
        mockMvc.perform(MockMvcRequestBuilders.delete("/reservations/{reservationId}",3))
                .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    @Transactional
    @WithMockUser(username = "johnDoe", password = "password123", roles = ["CLIENT"])
    fun checkIn() {
        mockMvc.perform(MockMvcRequestBuilders.put("/reservations/{reservationId}/checkIn",1))
                .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    @Transactional
    @WithMockUser(username = "janeDoe", password = "password321", roles = ["CLIENT"])
    fun checkOut() {
        mockMvc.perform(MockMvcRequestBuilders.put("/reservations/{reservationId}/checkOut",2))
                .andExpect(MockMvcResultMatchers.status().isOk)
    }
}