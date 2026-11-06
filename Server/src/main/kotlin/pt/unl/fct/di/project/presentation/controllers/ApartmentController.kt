package pt.unl.fct.di.project.presentation.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.project.application.ApartmentApplication
import pt.unl.fct.di.project.data.ApartmentDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.presentation.apis.ApartmentsAPI

@RestController
class ApartmentController(val apartmentApplication: ApartmentApplication) : ApartmentsAPI{

    override fun getApartmentsPage(page: Int): ResponseEntity<Map<String, Any>>
    {
        val res = apartmentApplication.getAllApartments(page)
        return ResponseEntity.ok(res)
    }

    override fun getApartment(apartmentId: Long): ResponseEntity<ApartmentDTO>
    {
        val res = apartmentApplication.getApartment(apartmentId)
        return ResponseEntity.ok(res)
    }

    override fun getCalendar(apartmentId: Long): ResponseEntity<List<PeriodDTO>>
    {
        val res = apartmentApplication.getCalendar(apartmentId)
        return ResponseEntity.ok(res)
    }

    override fun getReviewsForApartment(apartmentId: Long): ResponseEntity<List<ReviewDTO>>
    {
        val res = apartmentApplication.getReviewsOfApartment(apartmentId)
        return ResponseEntity.ok(res)
    }

    override fun getReservationsForApartment(apartmentId: Long): ResponseEntity<List<ReservationDTO>>
    {
        val res = apartmentApplication.getReservationsOfApartment(apartmentId)
        return ResponseEntity.ok(res)
    }

}
