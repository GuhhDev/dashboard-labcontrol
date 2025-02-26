package br.com.dashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsS3Config {

    @Value("${aws.region}")
    private String awsRegion;

    @Bean
    public S3Client s3Client() {
        // Para ambiente de produção, é recomendado usar o DefaultCredentialsProvider 
        // que busca credenciais do ambiente, perfil de instância EC2 ou variáveis de ambiente
        return S3Client.builder()
                .region(Region.of(awsRegion))
                .build();
    }
}
