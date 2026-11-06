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
import pt.unl.fct.di.project.data.CompactApartmentDTO
import pt.unl.fct.di.project.data.CompactUserDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.ReservationDTO
import java.time.LocalDate

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class OwnerControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        objectMapper.registerModule(JavaTimeModule())
    }
    @Test
    fun getOwners() {
        mockMvc.perform(MockMvcRequestBuilders.get("/owners"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize<Any>(2)))
    }

    @Test
    fun getOwner() {
        mockMvc.perform(MockMvcRequestBuilders.get("/owners/alexWright"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("alexWright"))
    }

    @Test
    @Transactional
    @WithMockUser(username = "alexWright", password = "alexPass123", roles = ["OWNER"])
    fun addPeriod() {
        val period = PeriodDTO(
                startDate = LocalDate.of(2023, 4, 1),
                endDate = LocalDate.of(2023, 4, 5)
        )

        val jsonString = objectMapper.writeValueAsString(period)

        mockMvc.perform(
                MockMvcRequestBuilders.put("/owners/{ownerUsername}/apartments/{apartmentId}/calendar", "alexWright", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    @Transactional
    @WithMockUser(username = "alexWright", password = "alexPass123", roles = ["OWNER"])
    fun `add Period Forbidden`() {
        val period = PeriodDTO(
                startDate = LocalDate.of(2023, 4, 1),
                endDate = LocalDate.of(2023, 4, 5)
        )

        val jsonString = objectMapper.writeValueAsString(period)

        mockMvc.perform(
                MockMvcRequestBuilders.put("/owners/{ownerUsername}/apartments/{apartmentId}/calendar", "johnDoe", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isForbidden)
    }

    @Test
    @Transactional
    @WithMockUser(username = "alexWright", password = "alexPass123", roles = ["OWNER"])
    fun `add Period NotFound`() {
        val period = PeriodDTO(
                startDate = LocalDate.of(2023, 4, 1),
                endDate = LocalDate.of(2023, 4, 5)
        )

        val jsonString = objectMapper.writeValueAsString(period)

        mockMvc.perform(
                MockMvcRequestBuilders.put("/owners/{ownerUsername}/apartments/{apartmentId}/calendar", "johnDoe", 10)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString)
        )
                .andExpect(MockMvcResultMatchers.status().isNotFound)
    }
}