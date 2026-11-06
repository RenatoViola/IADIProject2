package pt.unl.fct.di.project.data

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.OneToMany

@Entity
class OwnerDAO(

        username: String,
        password: String,
        email: String,
        pictureUrl: String,
        phoneNumber: String,

        @OneToMany(mappedBy = "owner", cascade = [CascadeType.ALL])
        var apartments: List<ApartmentDAO>
) : UserDAO(username, password, email, pictureUrl, phoneNumber, Role.OWNER)

