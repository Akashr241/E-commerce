package com.example.demo.ai.prescription.config;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class VisionConfig {
       

@Value("${google.vision.credentials}")
private String credentialPath;

@Bean
public ImageAnnotatorClient imageAnnotatorClient() throws IOException {

            System.out.println("Credential Path = " + credentialPath);// degugging line to check the value of credentialPath


    FileInputStream serviceAccount =
            new FileInputStream(credentialPath);

    GoogleCredentials credentials =
            GoogleCredentials.fromStream(serviceAccount);

    ImageAnnotatorSettings settings =
            ImageAnnotatorSettings.newBuilder()
                    .setCredentialsProvider(
                            FixedCredentialsProvider.create(credentials))
                    .build();

    return ImageAnnotatorClient.create(settings);
}

}