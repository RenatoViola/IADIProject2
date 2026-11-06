package pt.unl.fct.di.project.application

import org.springframework.stereotype.Component
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.StatusDTO
import pt.unl.fct.di.project.data.StatusType
import pt.unl.fct.di.project.service.ApartmentService
import pt.unl.fct.di.project.service.ReservationService

@Component
class ReservationApplication(val reservationService: ReservationService, val apartmentService: ApartmentService) {

    fun getReservation(id: Long): ReservationDTO = reservationService.getReservation(id).toDTO()

    fun getAllReservations(): List<ReservationDTO> = reservationService.getAllReservations().map { it.toDTO() }.toList()

    fun getReview(id: Long): ReviewDTO = reservationService.getReview(id).toDTO()

    fun getStatusHistory(id: Long): List<StatusDTO> = reservationService.getStatusHistory(id).map { it.toDTO() }

    fun confirmReservation(id: Long) {
        val reservation = reservationService.setStatus(id, StatusType.BOOKED)
        apartmentService.periodSubtractAndReplace(reservation.toDTO())
    }

    fun rejectReservation(id: Long) {
        reservationService.setStatus(id, StatusType.REJECTED)
    }

    fun checkIn(id: Long) {
        reservationService.setStatus(id, StatusType.OCCUPIED)
    }

    fun checkOut(id: Long) {
        reservationService.setStatus(id, StatusType.AWAITING_REVIEW)
    }

}