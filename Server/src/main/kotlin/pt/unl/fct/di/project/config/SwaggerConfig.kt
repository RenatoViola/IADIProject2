package pt.unl.fct.di.project.config
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info().title("Online renting service")
                    .description("This API enables performing rental operations, as well as put places up for rental")
                    .version("1.0")
            )
    }

}