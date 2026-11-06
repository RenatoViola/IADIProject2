package pt.unl.fct.di.project.presentation.apis

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import pt.unl.fct.di.project.data.ApartmentDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.ReservationDTO
import pt.unl.fct.di.project.data.ReviewDTO


@RequestMapping("/apartments")
@Tag(name = "Apartments", description = "Apartments API")
interface ApartmentsAPI {

    @GetMapping
    @Operation(summary = "Get all apartments")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "All apartments returned"),
        ApiResponse(responseCode = "404", description = "There are no apartments"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getApartmentsPage(@RequestParam(defaultValue = "0") page: Int): ResponseEntity<Map<String, Any>>

    @GetMapping("/{apartmentId}")
    @Operation(summary = "Get an apartment by ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Apartment returned"),
        ApiResponse(responseCode = "404", description = "There is no apartment with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getApartment(@PathVariable apartmentId: Long): ResponseEntity<ApartmentDTO>

    @GetMapping("/{apartmentId}/calendar")
    @Operation(summary = "Get the calendar of availability of an apartment by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Calendar returned"),
        ApiResponse(responseCode = "404", description = "There is no apartment with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getCalendar(@PathVariable apartmentId: Long): ResponseEntity<List<PeriodDTO>>

    @GetMapping("/{apartmentId}/reviews")
    @Operation(summary = "Get the reviews of an apartment by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reviews returned"),
        ApiResponse(responseCode = "404", description = "There is no apartment with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getReviewsForApartment(@PathVariable apartmentId: Long): ResponseEntity<List<ReviewDTO>>

    @GetMapping("/{apartmentId}/reservations")
    @Operation(summary = "Get the reservations of an apartment by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Reservations returned"),
        ApiResponse(responseCode = "404", description = "There is no apartment with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getReservationsForApartment(@PathVariable apartmentId: Long): ResponseEntity<List<ReservationDTO>>

}