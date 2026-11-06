package pt.unl.fct.di.project.application

import org.springframework.stereotype.Component
import pt.unl.fct.di.project.data.UserDTO
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.StatusType
import pt.unl.fct.di.project.service.ApartmentService
import pt.unl.fct.di.project.service.ClientService
import pt.unl.fct.di.project.service.ReservationService

@Component
class ClientApplication(val clientService: ClientService, val apartmentService: ApartmentService, val reservationService: ReservationService) {

    fun getClient(username: String): UserDTO = clientService.getClient(username).toDTO()

    fun getAllClients(): List<UserDTO> = clientService.getAllClients().map { it.toDTO() }.toList()

    fun makeReservation(reservationDTO: ReservationDTO): Long {
        apartmentService.checkIfAnyPeriodContainsReservation(reservationDTO)
        return reservationService.addReservation(reservationDTO)
    }

    fun cancelReservation(id: Long) {
        reservationService.setStatus(id, StatusType.CANCELLED)
    }

    fun getReservationsOfClient(username: String): List<ReservationDTO> = clientService.getClient(username).reservations.map { it.toDTO() }

    fun publishReview(id: Long, reviewDTO: ReviewDTO) {
        reservationService.publishReview(id, reviewDTO)
    }

}