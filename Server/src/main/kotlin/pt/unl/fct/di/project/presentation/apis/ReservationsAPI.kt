package pt.unl.fct.di.project.presentation.apis

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.project.config.*
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.StatusDTO


@RequestMapping("/reservations")
@Tag(name = "Reservations", description = "Reservations API")
interface ReservationsAPI {

    @GetMapping
    @Operation(summary = "Get all reservations")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "All reservations returned"),
        ApiResponse(responseCode = "404", description = "There are no reservations"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getReservations(): ResponseEntity<List<ReservationDTO>>

    @GetMapping("/{reservationId}")
    @Operation(summary = "Get a reservation by ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservation returned"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanViewReservation
    fun getReservation(@PathVariable reservationId: Long): ResponseEntity<ReservationDTO>

    @GetMapping("/{reservationId}/history")
    @Operation(summary = "Get the history of the statuses in a reservation by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Statuses returned"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanViewReservation
    fun getStatusHistory(@PathVariable reservationId: Long): ResponseEntity<List<StatusDTO>>

    @GetMapping("/{reservationId}/reviews")
    @Operation(summary = "Get the review correspondent to a reservation, by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Review returned"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "404", description = "There is no review for this reservation"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getReview(@PathVariable reservationId: Long): ResponseEntity<ReviewDTO>

    @PutMapping("/{reservationId}/confirmation")
    @Operation(summary = "Confirm a reservation by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservation updated"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Under Consideration'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanConfirmOrRejectReservation
    fun confirmReservation(@PathVariable reservationId: Long): ResponseEntity<Any>

    @PutMapping("/{reservationId}/rejection")
    @Operation(summary = "Reject a reservation by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservation rejected"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Under Consideration'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanConfirmOrRejectReservation
    fun rejectReservation(@PathVariable reservationId: Long): ResponseEntity<Any>

    @PutMapping("/{reservationId}/checkIn")
    @Operation(summary = "Check in by reservation ID")
    @ApiResponses(value =[
        ApiResponse(responseCode = "200", description = "Check-in done"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Booked'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
        
    ])
    @CanCheckIn
    fun checkIn(@PathVariable reservationId: Long): ResponseEntity<Any>

    @PutMapping("/{reservationId}/checkOut")
    @Operation(summary = "Check out by reservation ID")
    @ApiResponses(value =[
        ApiResponse(responseCode = "200", description = "Check-out done"),
        ApiResponse(responseCode = "400", description = "It is not possible to check-out"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Occupied'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")

    ])
    @CanCheckOut
    fun checkOut(@PathVariable reservationId: Long): ResponseEntity<Any>

}