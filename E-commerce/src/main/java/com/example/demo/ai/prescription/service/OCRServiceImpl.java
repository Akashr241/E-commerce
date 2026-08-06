package com.example.demo.ai.prescription.service;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class OCRServiceImpl implements OCRService {

    private final ImageAnnotatorClient visionClient;

    public OCRServiceImpl(ImageAnnotatorClient visionClient) {
        this.visionClient = visionClient;
    }

    @Override
    public String extractText(MultipartFile file) {

        try {

            ByteString imgBytes =
                    ByteString.copyFrom(file.getBytes());

            Image image =
                    Image.newBuilder()
                            .setContent(imgBytes)
                            .build();

            Feature feature =
                    Feature.newBuilder()
                            .setType(Feature.Type.DOCUMENT_TEXT_DETECTION)
                            .build();

            AnnotateImageRequest request =
                    AnnotateImageRequest.newBuilder()
                            .setImage(image)
                            .addFeatures(feature)
                            .build();

            BatchAnnotateImagesResponse response =
                    visionClient.batchAnnotateImages(
                            List.of(request));

            AnnotateImageResponse result =
                    response.getResponses(0);

            if (result.hasError()) {
                throw new RuntimeException(
                        result.getError().getMessage());
            }

            return result
                    .getFullTextAnnotation()
                    .getText();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}