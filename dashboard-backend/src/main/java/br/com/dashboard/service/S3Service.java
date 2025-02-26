package br.com.dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;
    
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Faz upload de um arquivo para o bucket S3
     * @param file Arquivo a ser enviado
     * @param prefix Prefixo do caminho no S3 (pasta)
     * @return URL do arquivo no S3
     */
    public String uploadFile(MultipartFile file, String prefix) {
        try {
            String fileName = generateUniqueFileName(file.getOriginalFilename());
            String key = prefix + "/" + fileName;
            
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();
            
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            
            return key;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload do arquivo para S3", e);
        }
    }

    /**
     * Faz download de um arquivo do bucket S3
     * @param key Chave do arquivo no S3
     * @return InputStream do arquivo
     */
    public InputStream downloadFile(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        
        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(getObjectRequest);
        return response;
    }

    /**
     * Exclui um arquivo do bucket S3
     * @param key Chave do arquivo no S3
     */
    public void deleteFile(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        
        s3Client.deleteObject(deleteObjectRequest);
    }

    /**
     * Gera um nome de arquivo único para evitar sobrescrever arquivos existentes
     * @param originalFilename Nome original do arquivo
     * @return Nome de arquivo único
     */
    private String generateUniqueFileName(String originalFilename) {
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + extension;
    }
}
