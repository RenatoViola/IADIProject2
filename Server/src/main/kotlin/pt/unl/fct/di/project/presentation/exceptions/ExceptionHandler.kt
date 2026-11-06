package pt.unl.fct.di.project.presentation.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ExceptionHandler {

    @ExceptionHandler(NoApartmentsFoundException::class)
    fun noApartments(e: NoApartmentsFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(InternalServerErrorException::class)
    fun serverError(e: InternalServerErrorException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null)
    }

    @ExceptionHandler(ApartmentNotFoundException::class)
    fun apartmentNotFound(e: ApartmentNotFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(InvalidDataException::class)
    fun invalidData(e: InvalidDataException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null)
    }

    @ExceptionHandler(NoClientsFoundException::class)
    fun noClients(e: NoClientsFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(ClientNotFoundException::class)
    fun clientNotFound(e: ClientNotFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(ReservationNotFoundException::class)
    fun reservationNotFound(e: ReservationNotFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(NoOwnersFoundException::class)
    fun noOwners(e: NoOwnersFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(OwnerNotFoundException::class)
    fun ownerNotFound(e: OwnerNotFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(NoReservationsFoundException::class)
    fun noReservations(e: NoReservationsFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(ReviewNotFoundException::class)
    fun reviewNotFound(e: ReviewNotFoundException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
    }

    @ExceptionHandler(InvalidStatusException::class)
    fun invalidStatus(e: InvalidStatusException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null)
    }

    @ExceptionHandler(ForbiddenPeriodException::class)
    fun forbiddenPeriod(e: ForbiddenPeriodException): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null)
    }

}