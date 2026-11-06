package pt.unl.fct.di.project.presentation.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.BeforeEach
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import pt.unl.fct.di.project.ProjectApplication
import pt.unl.fct.di.project.data.PeriodDTO
import java.time.LocalDate

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ApartmentControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun getApartments() {
        mockMvc.perform(get("/apartments"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$", hasSize<Any>(4)))
    }

    @Test
    fun getApartment() {
        mockMvc.perform(get("/apartments/1"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Sunny Studio"))
            .andExpect(jsonPath("$.owner.username").value("alexWright"))

    }

    @Test
    fun `get Apartment Not Found`() {
        mockMvc.perform(get("/apartments/10"))
                .andExpect(status().isNotFound)
    }

    @Test
    fun getCalendar() {
        mockMvc.perform(get("/apartments/{apartmentId}/calendar", 1))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$", hasSize<Any>(3)))
    }
}