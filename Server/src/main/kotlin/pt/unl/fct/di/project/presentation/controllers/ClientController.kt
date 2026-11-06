package pt.unl.fct.di.project.presentation.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.project.application.ClientApplication
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.UserDTO
import pt.unl.fct.di.project.presentation.apis.ClientsAPI

@RestController
class ClientController(val clientApplication: ClientApplication) : ClientsAPI {

    override fun addClient(client: UserDTO) {}

    override fun updateClient(clientUsername: String, client: UserDTO) {}

    override fun deleteClient(clientUsername: String) {}

    override fun getClients(): ResponseEntity<List<UserDTO>>
    {
        val res = clientApplication.getAllClients()
        return ResponseEntity.ok(res)
    }

    override fun getClient(clientUsername: String): ResponseEntity<UserDTO>
    {
        val res = clientApplication.getClient(clientUsername)
        return ResponseEntity.ok(res)
    }

    override fun addReservation(clientUsername: String, reservation: ReservationDTO): ResponseEntity<Long>
    {
        val res = clientApplication.makeReservation(reservation)
        return ResponseEntity.ok(res)
    }

    override fun cancelReservation(clientUsername: String, reservationId: Long): ResponseEntity<Any>
    {
        val res = clientApplication.cancelReservation(reservationId)
        return ResponseEntity.ok(res)
    }

    override fun getReservationsOfClient(clientUsername: String): ResponseEntity<List<ReservationDTO>> {
        val res = clientApplication.getReservationsOfClient(clientUsername)
        return ResponseEntity.ok(res)
    }

    override fun publishReview(clientUsername: String, reservationId: Long, review: ReviewDTO): ResponseEntity<Any>
    {
        val res = clientApplication.publishReview(reservationId, review)
        return ResponseEntity.ok(res)
    }
}
