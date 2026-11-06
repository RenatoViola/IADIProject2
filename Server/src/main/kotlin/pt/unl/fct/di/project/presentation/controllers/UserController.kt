package pt.unl.fct.di.project.presentation.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.project.config.IsTheUser
import pt.unl.fct.di.project.data.UserDTO
import pt.unl.fct.di.project.domain.UserRepository

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "User's API")
class UserController(val usersRepository: UserRepository) {

    @GetMapping("/{username}")
    @Operation(summary = "Retrieve a user by username")
    @IsTheUser
    fun getUser(@PathVariable username: String): UserDTO = usersRepository.findById(username).get().toDTO();
}