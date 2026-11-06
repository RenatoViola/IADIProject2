package pt.unl.fct.di.project.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.stereotype.Service
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import pt.unl.fct.di.project.domain.UserRepository
import pt.unl.fct.di.project.service.UserService

@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
class SecurityConfig {

    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity,
                            users: UserService,
                            authenticationManager: AuthenticationManager
    ): SecurityFilterChain? {
        http.invoke {
            csrf { disable() }

            cors {
                val corsConfiguration = CorsConfiguration().apply {
                    allowCredentials = true
                    allowedOrigins = listOf("http://localhost:3000")
                    allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    allowedHeaders = listOf("*")
                    exposedHeaders = listOf("Authorization")
                }
                val source = UrlBasedCorsConfigurationSource().apply {
                    registerCorsConfiguration("/**", corsConfiguration)
                }
                configurationSource = source
            }

            sessionManagement { SessionCreationPolicy.STATELESS }

            authorizeHttpRequests {
                authorize("/h2-console/**", permitAll)
                authorize("/v3/api-docs", permitAll)
                authorize("/swagger-ui/**", permitAll)
                authorize("/owners/**", hasRole("OWNER"))
                authorize("/clients/**", hasRole("CLIENT"))
                authorize("/apartments/**", permitAll)
                authorize("/reservations/**", permitAll)
                authorize(anyRequest, authenticated)
            }

            httpBasic {  }

            addFilterBefore<BasicAuthenticationFilter>(UserPasswordAuthenticationFilterToJWT("/login", authenticationManager))
            addFilterBefore<BasicAuthenticationFilter>(UserPasswordSignUpFilterToJWT ("/signup", users))
            addFilterBefore<BasicAuthenticationFilter>(JWTAuthenticationFilter())

        }
        return http.build()
    }

    @Bean
    fun authenticationManager(authConfiguration: AuthenticationConfiguration): AuthenticationManager? {
        return authConfiguration.authenticationManager
    }

    @Bean
    fun encoder(): PasswordEncoder = BCryptPasswordEncoder()

}

@Service
class UserDetailsServiceImpl(val user: UserRepository, val bcrypt: PasswordEncoder) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = user.findById(username).get()

        return User.withUsername(user.username)
            .password(bcrypt.encode(user.password))
            .roles(user.role.toString())
            .build()
    }
}
