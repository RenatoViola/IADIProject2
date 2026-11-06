package pt.unl.fct.di.project.presentation.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.project.application.ReservationApplication
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.StatusDTO
import pt.unl.fct.di.project.presentation.apis.ReservationsAPI

@RestController
class ReservationController(val reservationApplication: ReservationApplication) : ReservationsAPI{

    override fun getReservations(): ResponseEntity<List<ReservationDTO>>
    {
        val res = reservationApplication.getAllReservations()
        return ResponseEntity.ok(res)
    }

    override fun getReservation(reservationId: Long): ResponseEntity<ReservationDTO>
    {
        val res = reservationApplication.getReservation(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun getStatusHistory(reservationId: Long): ResponseEntity<List<StatusDTO>>
    {
        val res = reservationApplication.getStatusHistory(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun getReview(reservationId: Long): ResponseEntity<ReviewDTO>
    {
        val res = reservationApplication.getReview(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun confirmReservation(reservationId: Long): ResponseEntity<Any>
    {
        val res = reservationApplication.confirmReservation(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun rejectReservation(reservationId: Long): ResponseEntity<Any>
    {
        val res = reservationApplication.rejectReservation(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun checkIn(reservationId: Long): ResponseEntity<Any>
    {
        val res = reservationApplication.checkIn(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun checkOut(reservationId: Long): ResponseEntity<Any>
    {
        val res = reservationApplication.checkOut(reservationId)
        return ResponseEntity.ok(res)
    }

}