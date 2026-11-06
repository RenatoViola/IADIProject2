package pt.unl.fct.di.project.presentation.apis

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.project.config.IsOwnerOfApartment
import pt.unl.fct.di.project.config.IsTheOwner
import pt.unl.fct.di.project.data.ApartmentDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.UserDTO


@RequestMapping("/owners")
@Tag(name = "Owners", description = "Owners API")
interface OwnersAPI {

    @PostMapping
    @Operation(summary = "Create an owner")
    fun addOwner(@RequestBody owner: UserDTO)

    @PutMapping("/{ownerUsername}")
    @Operation(summary = "Update an owner by its username")
    @IsTheOwner
    fun updateOwner(@PathVariable ownerUsername: String, @RequestBody owner: UserDTO)

    @DeleteMapping("/{ownerUsername}")
    @Operation(summary = "Delete an owner by its username")
    @IsTheOwner
    fun deleteOwner(@PathVariable ownerUsername: String)

    @GetMapping
    @Operation(summary = "Get all owners")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "All owners returned"),
        ApiResponse(responseCode = "404", description = "There are no owners"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    fun getOwners(): ResponseEntity<List<UserDTO>>

    @GetMapping("/{ownerUsername}")
    @Operation(summary = "Get an owner by username")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Owner returned"),
        ApiResponse(responseCode = "404", description = "There is no owner with that username"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsTheOwner
    fun getOwner(@PathVariable ownerUsername: String): ResponseEntity<UserDTO>

    @PostMapping("/{ownerUsername}/apartments")
    @Operation(summary = "Create an apartment")
    @IsTheOwner
    fun addApartment(@PathVariable ownerUsername: String, @RequestBody apartment: ApartmentDTO)

    @PutMapping("/{ownerUsername}/apartments/{apartmentId}")
    @Operation(summary = "Update an apartment by its ID")
    @IsOwnerOfApartment
    fun updateApartment(@PathVariable ownerUsername: String, @PathVariable apartmentId: Long, @RequestBody apartment: ApartmentDTO)

    @DeleteMapping("/{ownerUsername}/apartments/{apartmentId}")
    @Operation(summary = "Delete an apartment by its ID")
    @IsOwnerOfApartment
    fun deleteApartment(@PathVariable ownerUsername: String, @PathVariable apartmentId: Long)

    @PostMapping("/{ownerUsername}/apartments/{apartmentId}/calendar")
    @Operation(summary = "Add a period to an apartment by its ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Period added to apartment"),
        ApiResponse(responseCode = "400", description = "Invalid data - start date must occur before end date"),
        ApiResponse(responseCode = "403", description = "Cannot create - this period would overlap with others"),
        ApiResponse(responseCode = "404", description = "There is no apartment with that ID"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsOwnerOfApartment
    fun addPeriod(@PathVariable ownerUsername: String, @PathVariable apartmentId: Long, @RequestBody period: PeriodDTO): ResponseEntity<Any>

    @GetMapping("/{ownerUsername}/apartments")
    @Operation(summary = "Retrieve the apartments of an owner by its username")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Apartments returned"),
        ApiResponse(responseCode = "404", description = "There is no owner with that username"),
        ApiResponse(responseCode = "500", description = "Internal Server Error")
    ])
    @IsTheOwner
    fun getApartmentsOfOwner(@PathVariable ownerUsername: String, @RequestParam(defaultValue = "0") page: Int): ResponseEntity<Map<String, Any>>

}