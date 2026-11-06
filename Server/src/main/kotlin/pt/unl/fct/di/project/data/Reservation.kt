package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*
import java.time.LocalDate

@Entity
data class ReservationDAO (

    @Id @GeneratedValue val id: Long = 0,

    var startDate: LocalDate,

    var endDate: LocalDate,

    val numberOfPeople: Int,

    val price: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_username")
    var client: ClientDAO,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    var apartment: ApartmentDAO,

    @OneToMany(mappedBy = "reservation", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    val history: MutableList<StatusDAO> = mutableListOf(),

    @OneToOne(mappedBy = "reservation", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var review: ReviewDAO? = null

){
    fun toDTO(): ReservationDTO =
        ReservationDTO(
            id,
            startDate,
            endDate,
            numberOfPeople,
            price,
            history.last().state,
            client.toCompactDTO(),
            apartment.toCompactDTO()
        )

    override fun toString(): String =
        "ReservationDAO(id=$id, startDate=$startDate, endDate=$endDate, numberOfPeople=$numberOfPeople, price=$price, client=${client.username}, apartment=${apartment.id}, history=$history, review=$review)"

}


@Schema(name="Reservation")
data class ReservationDTO(
    val id: Long = 0,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val numberOfPeople: Int,
    val price: Int,
    val status: StatusType = StatusType.UNDER_CONSIDERATION,
    val client: CompactUserDTO,
    val apartment: CompactApartmentDTO
)