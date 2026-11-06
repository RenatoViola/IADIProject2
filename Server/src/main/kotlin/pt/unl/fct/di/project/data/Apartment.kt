package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*


@Entity
data class ApartmentDAO (

    @Id @GeneratedValue val id: Long,

    val name: String,

    val description: String,

    val location: String,

    val amenities: String,

    val pictureUrls: String,

    val pricePerNight: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_username")
    val owner: OwnerDAO,

    @OneToMany(mappedBy = "apartment", cascade = [CascadeType.ALL])
    val periods: List<PeriodDAO>,

    @OneToMany(mappedBy = "apartment")
    val reservations: List<ReservationDAO>

){
    fun toDTO(): ApartmentDTO =
        ApartmentDTO(
            id,
            name,
            description,
            location,
            amenities,
            pictureUrls,
            pricePerNight,
            owner.toCompactDTO()
        )

    fun toCompactDTO(): CompactApartmentDTO =
        CompactApartmentDTO(
            id,
            name,
            pictureUrls
        )

    override fun toString(): String =
        "ApartmentDAO(id=$id, name='$name', description='$description', location='$location', amenities='$amenities', pictureUrls='$pictureUrls', pricePerNight=$pricePerNight, owner=${owner.username})"

}

@Schema(name="Apartment")
data class ApartmentDTO(
    val id: Long = 0,
    val name: String,
    val description: String,
    val location: String,
    val amenities: String,
    val pictureUrls: String,
    val pricePerNight: Int,
    val owner: CompactUserDTO
)

@Schema(name="Compact Apartment", description = "Compact version of the Apartment")
data class CompactApartmentDTO(
    val id: Long,
    val name: String?,
    val pictureUrls: String?
)