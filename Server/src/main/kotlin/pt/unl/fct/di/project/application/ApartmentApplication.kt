package pt.unl.fct.di.project.application

import org.springframework.stereotype.Component
import pt.unl.fct.di.project.data.ApartmentDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.service.ApartmentService

@Component
class ApartmentApplication(val apartmentService: ApartmentService) {

    fun getApartment(id: Long): ApartmentDTO = apartmentService.getApartment(id).toDTO()

    fun getAllApartments(page: Int): Map<String, Any> {
        val pageResult = apartmentService.getAllApartments(page)

        val response = HashMap<String, Any>()
        response["data"] = pageResult.content.map { it.toDTO() }
        response["currentPage"] = pageResult.number
        response["totalPages"] = pageResult.totalPages
        response["isLastPage"] = !pageResult.hasNext()

        return response
    }

    fun getCalendar(id: Long): List<PeriodDTO> = apartmentService.getCalendar(id).map { it.toDTO() }

    fun getReservationsOfApartment(id: Long): List<ReservationDTO> = apartmentService.getReservationsOfApartment(id).map { it.toDTO() }

    fun getReviewsOfApartment(id: Long): List<ReviewDTO> = apartmentService.getReviewsOfApartment(id).map { it.toDTO() }

}