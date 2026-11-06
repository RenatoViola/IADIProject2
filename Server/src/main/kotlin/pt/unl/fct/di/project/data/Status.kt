package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*
import java.io.Serializable
import java.time.LocalDate


data class StatusKey(

    val reservationId: Long = 0L,

    val state: StatusType = StatusType.AVAILABLE

) : Serializable

enum class StatusType {
    AVAILABLE,
    UNDER_CONSIDERATION,
    BOOKED,
    OCCUPIED,
    AWAITING_REVIEW,
    CLOSED,
    REJECTED,
    CANCELLED
}

@Entity
@IdClass(StatusKey::class)
data class StatusDAO (

    @Id
    val reservationId: Long,

    val transitionDate: LocalDate,

    @Id
    val state: StatusType,

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reservationId")
    @JoinColumn(name = "reservationId")
    val reservation: ReservationDAO,

){
    fun toDTO(): StatusDTO =
        StatusDTO(
            transitionDate,
            state
        )

    override fun toString(): String =
        "StatusDAO(reservationId=$reservationId, transitionDate=$transitionDate, state=$state)"

}


@Schema(name="Status")
data class StatusDTO(
    val transitionDate: LocalDate,
    val state: StatusType
)