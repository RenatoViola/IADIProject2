package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*
import java.io.Serializable
import java.time.LocalDate

data class PeriodKey(

        val apartmentId: Long? = null,

        val startDate: LocalDate? = null

) : Serializable


@Entity
@IdClass(PeriodKey::class)
data class PeriodDAO(

        @Id
        val apartmentId: Long?,

        @Id
        val startDate: LocalDate,

        val endDate: LocalDate,

        @ManyToOne(fetch = FetchType.LAZY)
        @MapsId("apartmentId")
        @JoinColumn(name = "apartmentId")
        val apartment: ApartmentDAO?
){
        fun toDTO(): PeriodDTO =
                PeriodDTO(
                        startDate,
                        endDate
                )

        fun contains(startDate: LocalDate, endDate: LocalDate): Boolean =
                !this.startDate.isAfter(startDate) && !this.endDate.isBefore(endDate)

        fun intersects(other: PeriodDAO): Boolean =
                !this.startDate.isAfter(other.endDate) && !other.startDate.isAfter(this.endDate)

        fun isAdjacentTo(other: PeriodDAO): Boolean =
                endDate.plusDays(1).isEqual(other.startDate) || this.startDate.minusDays(1).isEqual(other.endDate)

        fun canBeMerged(other: PeriodDAO): Boolean =  intersects(other) || isAdjacentTo(other)

        fun merge(other: PeriodDAO): PeriodDAO =
                PeriodDAO(apartmentId, minOf(this.startDate, other.startDate), maxOf(this.endDate, other.endDate), apartment)

        fun subtract(startDate: LocalDate, endDate: LocalDate): List<PeriodDAO> {
                // If the other period completely covers this period, return an empty list
                if (startDate.isBefore(this.startDate) && endDate.isAfter(this.endDate)) return emptyList()

                val result = mutableListOf<PeriodDAO>()

                // If there is a remaining period at the start
                if (startDate.isAfter(this.startDate))
                        result.add(PeriodDAO(apartmentId, this.startDate, startDate.minusDays(1), apartment))

                // If there is a remaining period at the end
                if (endDate.isBefore(this.endDate))
                        result.add(PeriodDAO(apartmentId, endDate.plusDays(1), this.endDate, apartment))

                return result
        }

        override fun toString(): String =
                "PeriodDAO(apartmentId=$apartmentId, startDate=$startDate, endDate=$endDate)"


}

@Schema(name="Period")
data class PeriodDTO(
        val startDate: LocalDate,
        val endDate: LocalDate
)