package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*

@Entity
data class ReviewDAO (

        @Id val reservationId: Long,

        val text: String,

        val rating: Int,

        @OneToOne(fetch = FetchType.LAZY)
        @MapsId("reservationId")
        @JoinColumn(name = "reservation_id")
        val reservation: ReservationDAO

){
        fun toDTO(): ReviewDTO =
                ReviewDTO(
                        text,
                        rating
                )

        override fun toString(): String =
                "ReviewDAO(reservationId=$reservationId, text='$text', rating=$rating)"

}


@Schema(name="Review")
data class ReviewDTO(
        val text: String,
        val rating: Int
)