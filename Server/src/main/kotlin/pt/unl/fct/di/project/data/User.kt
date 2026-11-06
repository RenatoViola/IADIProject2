package pt.unl.fct.di.project.data

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.*

enum class Role {
    CLIENT, OWNER, MANAGER
}

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
abstract class UserDAO(

    @Id
    open val username: String,

    @Column(nullable = false)
    open val password: String,

    @Column(unique = true)
    open val email: String,

    open val pictureUrl: String,

    open val phoneNumber: String,

    open val role : Role
){
    fun toDTO(): UserDTO =
        UserDTO(
            username,
            email,
            pictureUrl,
            phoneNumber,
            role.toString()
        )

    fun toCompactDTO(): CompactUserDTO =
        CompactUserDTO(
            username,
            email
        )

    override fun toString(): String =
        "UserDAO(username='$username', password='$password', email='$email', pictureUrl='$pictureUrl', phoneNumber='$phoneNumber')"
}

@Schema(name="User")
class UserDTO(
    val username: String,
    val email: String,
    val pictureUrl: String,
    val phoneNumber: String,
    val role: String
)

@Schema(name="Compact User", description = "Compact version of the User")
data class CompactUserDTO(
    val username: String,
    val email: String
)