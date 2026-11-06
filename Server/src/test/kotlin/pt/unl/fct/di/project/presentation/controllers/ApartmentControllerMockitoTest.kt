package pt.unl.fct.di.project.presentation.controllers

import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import pt.unl.fct.di.project.ProjectApplication
import pt.unl.fct.di.project.data.ApartmentDAO
import pt.unl.fct.di.project.data.OwnerDAO
import pt.unl.fct.di.project.data.PeriodDAO
import pt.unl.fct.di.project.domain.ApartmentRepository
import pt.unl.fct.di.project.domain.PeriodRepository
import java.time.LocalDate
import java.util.*

@SpringBootTest(classes = [ProjectApplication::class])
@AutoConfigureMockMvc
class ApartmentControllerMockitoTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var apartments: ApartmentRepository

    @MockBean
    lateinit var periods: PeriodRepository

    companion object {
        val listApartments = mutableListOf<ApartmentDAO>()

        init {
            val apartmentOne = ApartmentDAO(
                    id = 1,
                    name = "Apartment One",
                    description = "Description for Apartment One",
                    location = "Location One",
                    amenities = "Amenities One",
                    pictureUrl = "http://example.com/picture1.jpg",
                    pricePerNight = 100,
                    owner = OwnerDAO(
                            username = "alexWright",
                            password = "alexPass123",
                            email = "alex.wright@email.com",
                            pictureUrl = "http://example.com/pictures/alexWright.jpg",
                            phoneNumber = "321-123-4567",
                            apartments = listOf()
                    ),
                    periods = mutableListOf(),
                    reservations = listOf()
            )
            val apartmentTwo = ApartmentDAO(
                    id = 2,
            name = "Apartment Two",
            description = "Description for Apartment Two",
            location = "Location Two",
            amenities = "Amenities Two",
            pictureUrl = "http://example.com/picture2.jpg",
            pricePerNight = 120,
            owner = OwnerDAO(
                    username = "janeDoe",
                    password = "janePass123",
                    email = "jane.doe@email.com",
                    pictureUrl = "http://example.com/pictures/janeDoe.jpg",
                    phoneNumber = "321-987-6543",
                    apartments = listOf()
            ),
            periods = mutableListOf(),
            reservations = listOf()
            )
            val apartmentThree = ApartmentDAO(
                    id = 3,
                    name = "Apartment Three",
                    description = "Description for Apartment Three",
                    location = "Location Three",
                    amenities = "Amenities Three",
                    pictureUrl = "http://example.com/picture3.jpg",
                    pricePerNight = 90,
                    owner = OwnerDAO(
                            username = "johnSmith",
                            password = "johnPass123",
                            email = "john.smith@email.com",
                            pictureUrl = "http://example.com/pictures/johnSmith.jpg",
                            phoneNumber = "123-456-7890",
                            apartments = listOf()
                    ),
                    periods = mutableListOf(),
                    reservations = listOf()
            )

            val periodOne = PeriodDAO(
                    apartmentId = apartmentOne.id,
                    startDate = LocalDate.of(2023, 11, 1),
                    endDate = LocalDate.of(2023, 11, 7),
                    apartment = apartmentOne
            )

            val periodTwo = PeriodDAO(
                    apartmentId = apartmentOne.id,
                    startDate = LocalDate.of(2023, 11, 15),
                    endDate = LocalDate.of(2023, 11, 21),
                    apartment = apartmentOne
            )

            apartmentOne.periods.addAll(listOf(periodOne, periodTwo))
            listApartments.addAll(listOf(apartmentOne, apartmentTwo, apartmentThree))

        }
    }


    @Test
    fun `get Apartments`() {

        Mockito.`when`(apartments.findAll().toList()).thenReturn(listApartments)

        mockMvc.perform(get("/apartments"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize<Any>(3)))
    }

    @Test
    fun `get Apartment`() {

        val apartmentId = 2L

        Mockito.`when`(apartments.findById(apartmentId)).thenReturn(Optional.ofNullable(listApartments.firstOrNull { it.id == apartmentId }))

        mockMvc.perform(get("/apartments/$apartmentId"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Apartment Two"))

    }

    @Test
    fun `get Calendar`() {

        val apartmentId = 1L

        val expectedPeriods = listApartments
                .firstOrNull { it.id == apartmentId }
                ?.periods

        Mockito.`when`(periods.findAllByApartmentId(apartmentId)).thenReturn(expectedPeriods)

        mockMvc.perform(get("/apartments/$apartmentId/calendar"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize<Any>(2)))
                .andExpect(jsonPath("$[0].startDate").value("2023-11-01"))
    }
}