package pt.unl.fct.di.project.presentation.apis

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.project.config.CanCancelReservation
import pt.unl.fct.di.project.config.CanPublishReview
import pt.unl.fct.di.project.config.IsTheClient
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO
import pt.unl.fct.di.project.data.UserDTO


@RequestMapping("/clients")
@Tag(name = "Clients", description = "Clients API")
interface ClientsAPI {

    @PostMapping
    @Operation(summary = "Create a client")
    fun addClient(@RequestBody client: UserDTO)

    @PutMapping("/{clientUsername}")
    @Operation(summary = "Update a client by its username")
    @IsTheClient
    fun updateClient(@PathVariable clientUsername: String, @RequestBody client: UserDTO)

    @DeleteMapping("/{clientUsername}")
    @Operation(summary = "Delete a client by its username")
    @IsTheClient
    fun deleteClient(@PathVariable clientUsername: String)

    @GetMapping
    @Operation(summary = "Get all clients")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "All clients returned"),
        ApiResponse(responseCode = "404", description = "There are no clients"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getClients(): ResponseEntity<List<UserDTO>>

    @GetMapping("/{clientUsername}")
    @Operation(summary = "Get a client by username")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Client returned"),
        ApiResponse(responseCode = "404", description = "There is no client with that username"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsTheClient
    fun getClient(@PathVariable clientUsername: String): ResponseEntity<UserDTO>

    @PostMapping("/{clientUsername}/reservations")
    @Operation(summary = "Create a reservation")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservation created"),
        ApiResponse(responseCode = "400", description = "Invalid data"),
        ApiResponse(responseCode = "403", description = "The apartment is unavailable in the desired period of time"),
        ApiResponse(responseCode = "404", description = "There is no client with that username"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsTheClient
    fun addReservation(@PathVariable clientUsername: String, @RequestBody reservation: ReservationDTO): ResponseEntity<Long>

    @PutMapping("/{clientUsername}/reservations/{reservationId}/cancellation")
    @Operation(summary = "Cancel a reservation by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservation cancelled"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Under Consideration'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanCancelReservation
    fun cancelReservation(@PathVariable clientUsername: String, @PathVariable reservationId: Long): ResponseEntity<Any>

    @GetMapping("/{clientUsername}/reservations")
    @Operation(summary = "Retrieve the reservations of a client by its username")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservations returned"),
        ApiResponse(responseCode = "404", description = "There is no client with that username"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsTheClient
    fun getReservationsOfClient(@PathVariable clientUsername: String): ResponseEntity<List<ReservationDTO>>

    @PutMapping("/{clientUsername}/reservations/{reservationId}/reviews")
    @Operation(summary = "Publish a review to a reservation by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Review published"),
        ApiResponse(responseCode = "400", description = "Invalid data"),
        ApiResponse(responseCode = "403", description = "Reservation status must be 'Awaiting Review'"),
        ApiResponse(responseCode = "404", description = "There is no reservation with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @CanPublishReview
    fun publishReview(@PathVariable clientUsername: String, @PathVariable reservationId: Long, @RequestBody review: ReviewDTO): ResponseEntity<Any>
}