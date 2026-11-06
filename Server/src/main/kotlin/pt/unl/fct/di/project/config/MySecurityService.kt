package pt.unl.fct.di.project.config

import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import pt.unl.fct.di.project.data.StatusType
import pt.unl.fct.di.project.domain.ApartmentRepository
import pt.unl.fct.di.project.domain.ReservationRepository
import pt.unl.fct.di.project.presentation.exceptions.ApartmentNotFoundException
import pt.unl.fct.di.project.presentation.exceptions.ReservationNotFoundException

@Service
class MySecurityService (val apartments : ApartmentRepository, val reservations : ReservationRepository)
{
    fun isTheUser(authentication: Authentication, username: String): Boolean = username == authentication.name

    fun isOwnerOfApartment(authentication: Authentication, ownerUsername: String, apartmentId: Long): Boolean {
        val apartment = apartments.findById(apartmentId).orElseThrow{ApartmentNotFoundException()}
        return this.isTheOwner(authentication, ownerUsername) && authentication.name == apartment.owner.username
    }

    fun isTheOwner(authentication: Authentication, ownerUsername: String): Boolean {
        val authority = authentication.authorities.first().authority
        return authority == "ROLE_OWNER" && isTheUser(authentication, ownerUsername)
    }

    fun canPublishReview(authentication: Authentication, clientUsername: String, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }

        return (this.isTheClient(authentication, clientUsername) &&
                authentication.name == reservation.client.username) &&
                reservation.history.last().state == StatusType.AWAITING_REVIEW
    }

    fun isTheClient(authentication: Authentication, clientUsername: String): Boolean {
        val authority = authentication.authorities.first().authority
        return authority == "ROLE_CLIENT" && isTheUser(authentication, clientUsername)
    }

    fun canCancelReservation(authentication: Authentication, clientUsername: String, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }

        return (this.isTheClient(authentication, clientUsername) &&
                authentication.name == reservation.client.username) &&
                reservation.history.last().state == StatusType.UNDER_CONSIDERATION
    }

    fun canViewReservation(authentication: Authentication, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }
        val authority = authentication.authorities.first().authority
        return authority == "ROLE_MANAGER" ||
                authority == "ROLE_OWNER" && authentication.name == reservation.apartment.owner.username ||
                authority == "ROLE_CLIENT" && authentication.name == reservation.client.username
    }

    fun canConfirmOrRejectReservation(authentication: Authentication, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }
        val authority = authentication.authorities.first().authority
        return (authority == "ROLE_MANAGER" ||
                authority == "ROLE_OWNER" && authentication.name == reservation.apartment.owner.username) &&
                reservation.history.last().state == StatusType.UNDER_CONSIDERATION
    }

    fun canCheckIn(authentication: Authentication, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }
        val authority = authentication.authorities.first().authority
        return (authority == "ROLE_MANAGER" ||
                authority == "ROLE_CLIENT" && authentication.name == reservation.client.username) &&
                reservation.history.last().state == StatusType.BOOKED
    }

    fun canCheckOut(authentication: Authentication, reservationId: Long): Boolean {
        val reservation = reservations.findById(reservationId).orElseThrow { ReservationNotFoundException() }
        val authority = authentication.authorities.first().authority
        return (authority == "ROLE_MANAGER" ||
                authority == "ROLE_CLIENT" && authentication.name == reservation.client.username) &&
                reservation.history.last().state == StatusType.OCCUPIED
    }
}
