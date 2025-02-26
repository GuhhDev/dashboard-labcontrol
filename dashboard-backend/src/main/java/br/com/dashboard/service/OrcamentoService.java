package br.com.dashboard.service;

import br.com.dashboard.entity.Orçamento;
import br.com.dashboard.repository.OrcamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;
    private final ExcelService excelService;
    private final S3Service s3Service;
    
    private static final String S3_PREFIX = "orcamentos";

    @Autowired
    public OrcamentoService(OrcamentoRepository orcamentoRepository, ExcelService excelService, S3Service s3Service) {
        this.orcamentoRepository = orcamentoRepository;
        this.excelService = excelService;
        this.s3Service = s3Service;
    }

    /**
     * Importa dados de uma planilha Excel para a tabela Orçamento
     * @param file Arquivo Excel
     * @return Número de registros importados
     */
    public int importFromExcel(MultipartFile file) {
        try {
            // Valida se é um arquivo Excel
            if (!excelService.isExcelFile(file)) {
                throw new IllegalArgumentException("O arquivo não é uma planilha Excel válida");
            }
            
            // Faz upload do arquivo para o S3
            String s3Key = s3Service.uploadFile(file, S3_PREFIX);
            
            // Lê os dados do Excel
            List<Orçamento> orcamentos = excelService.readOrcamentoFromExcel(file.getInputStream());
            
            // Salva os dados no banco
            orcamentoRepository.saveAll(orcamentos);
            
            return orcamentos.size();
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar o arquivo Excel", e);
        }
    }

    /**
     * Exporta dados da tabela Orçamento para uma planilha Excel e salva no S3
     * @return Chave do arquivo no S3
     */
    public String exportToExcel() {
        try {
            // Busca todos os registros
            List<Orçamento> orcamentos = orcamentoRepository.findAll();
            
            // Gera a planilha Excel
            ByteArrayInputStream excelStream = excelService.writeOrcamentoToExcel(orcamentos);
            
            // Cria um arquivo temporário para fazer upload para o S3
            MultipartFile tempFile = new MultipartFile() {
                @Override
                public String getName() {
                    return "orcamento_export.xlsx";
                }

                @Override
                public String getOriginalFilename() {
                    return "orcamento_export.xlsx";
                }

                @Override
                public String getContentType() {
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                }

                @Override
                public boolean isEmpty() {
                    return false;
                }

                @Override
                public long getSize() {
                    return excelStream.available();
                }

                @Override
                public byte[] getBytes() throws IOException {
                    return excelStream.readAllBytes();
                }

                @Override
                public InputStream getInputStream() throws IOException {
                    return excelStream;
                }

                @Override
                public void transferTo(java.io.File dest) throws IOException, IllegalStateException {
                    throw new UnsupportedOperationException("Método não suportado");
                }
            };
            
            // Faz upload do arquivo para o S3
            return s3Service.uploadFile(tempFile, S3_PREFIX);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao gerar o arquivo Excel", e);
        }
    }
    
    /**
     * Busca todos os registros de Orçamento
     * @return Lista de Orçamento
     */
    public List<Orçamento> findAll() {
        return orcamentoRepository.findAll();
    }
    
    /**
     * Busca um registro de Orçamento pelo ID
     * @param id ID do registro
     * @return Orçamento encontrado ou vazio
     */
    public Optional<Orçamento> findById(Long id) {
        return orcamentoRepository.findById(id);
    }
    
    /**
     * Salva um registro de Orçamento
     * @param orcamento Orçamento a ser salvo
     * @return Orçamento salvo
     */
    public Orçamento save(Orçamento orcamento) {
        return orcamentoRepository.save(orcamento);
    }
    
    /**
     * Exclui um registro de Orçamento
     * @param id ID do registro a ser excluído
     */
    public void deleteById(Long id) {
        orcamentoRepository.deleteById(id);
    }
}
