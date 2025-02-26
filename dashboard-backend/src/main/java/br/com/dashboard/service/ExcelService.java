package br.com.dashboard.service;

import br.com.dashboard.entity.Orçamento;
import br.com.dashboard.entity.OrçamentoRealizado;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ExcelService {

    private static final String ORCAMENTO_SHEET = "Orçamento";
    private static final String ORCAMENTO_REALIZADO_SHEET = "OrçamentoRealizado";

    /**
     * Lê uma planilha Excel e converte para uma lista de Orçamento
     * @param inputStream InputStream da planilha
     * @return Lista de Orçamento
     */
    public List<Orçamento> readOrcamentoFromExcel(InputStream inputStream) throws IOException {
        List<Orçamento> orcamentos = new ArrayList<>();
        
        try (Workbook workbook = WorkbookFactory.create(inputStream)) {
            Sheet sheet = workbook.getSheet(ORCAMENTO_SHEET);
            if (sheet == null) {
                sheet = workbook.getSheetAt(0); // Tenta a primeira aba se não encontrar pelo nome
            }
            
            Iterator<Row> rows = sheet.iterator();
            
            // Pula o cabeçalho
            if (rows.hasNext()) {
                rows.next();
            }
            
            while (rows.hasNext()) {
                Row row = rows.next();
                Orçamento orcamento = new Orçamento();
                
                // Lê os campos da linha e popula o objeto Orçamento
                orcamento.setMpa(getStringCellValue(row.getCell(0)));
                orcamento.setVolumeOrcado(getBigDecimalCellValue(row.getCell(1)));
                orcamento.setQuantidadeExecutado(getBigDecimalCellValue(row.getCell(2)));
                orcamento.setPercentualExecucao(getBigDecimalCellValue(row.getCell(3)));
                orcamento.setMediaValorOrcado(getBigDecimalCellValue(row.getCell(4)));
                orcamento.setMediaValorExecutado(getBigDecimalCellValue(row.getCell(5)));
                orcamento.setDifTraco(getBigDecimalCellValue(row.getCell(6)));
                orcamento.setValorTotalOrcado(getBigDecimalCellValue(row.getCell(7)));
                orcamento.setValorOrcadoParcial(getBigDecimalCellValue(row.getCell(8)));
                orcamento.setValorExecutadoParcial(getBigDecimalCellValue(row.getCell(9)));
                orcamento.setDisponivelParaExecucao(getBigDecimalCellValue(row.getCell(10)));
                orcamento.setEconomia(getBigDecimalCellValue(row.getCell(11)));
                
                orcamentos.add(orcamento);
            }
        }
        
        return orcamentos;
    }
    
    /**
     * Lê uma planilha Excel e converte para uma lista de OrçamentoRealizado
     * @param inputStream InputStream da planilha
     * @return Lista de OrçamentoRealizado
     */
    public List<OrçamentoRealizado> readOrcamentoRealizadoFromExcel(InputStream inputStream) throws IOException {
        List<OrçamentoRealizado> orcamentosRealizados = new ArrayList<>();
        
        try (Workbook workbook = WorkbookFactory.create(inputStream)) {
            Sheet sheet = workbook.getSheet(ORCAMENTO_REALIZADO_SHEET);
            if (sheet == null) {
                sheet = workbook.getSheetAt(0); // Tenta a primeira aba se não encontrar pelo nome
            }
            
            Iterator<Row> rows = sheet.iterator();
            
            // Pula o cabeçalho
            if (rows.hasNext()) {
                rows.next();
            }
            
            while (rows.hasNext()) {
                Row row = rows.next();
                OrçamentoRealizado orcamentoRealizado = new OrçamentoRealizado();
                
                // Lê os campos da linha e popula o objeto OrçamentoRealizado
                orcamentoRealizado.setMaterial(getStringCellValue(row.getCell(0)));
                orcamentoRealizado.setOrcamentoTon(getBigDecimalCellValue(row.getCell(1)));
                orcamentoRealizado.setOrcamentoCustoPorTon(getBigDecimalCellValue(row.getCell(2)));
                orcamentoRealizado.setOrcamentoValorTotal(getBigDecimalCellValue(row.getCell(3)));
                orcamentoRealizado.setSistemaTonL(getBigDecimalCellValue(row.getCell(4)));
                orcamentoRealizado.setSistemaCustoPorTonL(getBigDecimalCellValue(row.getCell(5)));
                orcamentoRealizado.setSistemaValorTotal(getBigDecimalCellValue(row.getCell(6)));
                orcamentoRealizado.setSaldoTon(getBigDecimalCellValue(row.getCell(7)));
                orcamentoRealizado.setSaldoValor(getBigDecimalCellValue(row.getCell(8)));
                orcamentoRealizado.setDiferencaTon(getBigDecimalCellValue(row.getCell(9)));
                orcamentoRealizado.setDiferencaCustoPorTon(getBigDecimalCellValue(row.getCell(10)));
                orcamentoRealizado.setDiferencaValorTotal(getBigDecimalCellValue(row.getCell(11)));
                
                orcamentosRealizados.add(orcamentoRealizado);
            }
        }
        
        return orcamentosRealizados;
    }
    
    /**
     * Cria uma planilha Excel a partir de uma lista de Orçamento
     * @param orcamentos Lista de Orçamento
     * @return InputStream da planilha gerada
     */
    public ByteArrayInputStream writeOrcamentoToExcel(List<Orçamento> orcamentos) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet(ORCAMENTO_SHEET);
            
            // Cria o cabeçalho
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("MPA");
            headerRow.createCell(1).setCellValue("Volume Orçado");
            headerRow.createCell(2).setCellValue("Quantidade Executado");
            headerRow.createCell(3).setCellValue("Percentual Execução");
            headerRow.createCell(4).setCellValue("Média Valor Orçado");
            headerRow.createCell(5).setCellValue("Média Valor Executado");
            headerRow.createCell(6).setCellValue("Dif. Traço");
            headerRow.createCell(7).setCellValue("Valor Total Orçado");
            headerRow.createCell(8).setCellValue("Valor Orçado Parcial");
            headerRow.createCell(9).setCellValue("Valor Executado Parcial");
            headerRow.createCell(10).setCellValue("Disponível para Execução");
            headerRow.createCell(11).setCellValue("Economia");
            
            // Preenche os dados
            int rowNum = 1;
            for (Orçamento orcamento : orcamentos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(orcamento.getMpa() != null ? orcamento.getMpa() : "");
                setCellValue(row.createCell(1), orcamento.getVolumeOrcado());
                setCellValue(row.createCell(2), orcamento.getQuantidadeExecutado());
                setCellValue(row.createCell(3), orcamento.getPercentualExecucao());
                setCellValue(row.createCell(4), orcamento.getMediaValorOrcado());
                setCellValue(row.createCell(5), orcamento.getMediaValorExecutado());
                setCellValue(row.createCell(6), orcamento.getDifTraco());
                setCellValue(row.createCell(7), orcamento.getValorTotalOrcado());
                setCellValue(row.createCell(8), orcamento.getValorOrcadoParcial());
                setCellValue(row.createCell(9), orcamento.getValorExecutadoParcial());
                setCellValue(row.createCell(10), orcamento.getDisponivelParaExecucao());
                setCellValue(row.createCell(11), orcamento.getEconomia());
            }
            
            // Ajusta a largura das colunas
            for (int i = 0; i < 12; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    
    /**
     * Cria uma planilha Excel a partir de uma lista de OrçamentoRealizado
     * @param orcamentosRealizados Lista de OrçamentoRealizado
     * @return InputStream da planilha gerada
     */
    public ByteArrayInputStream writeOrcamentoRealizadoToExcel(List<OrçamentoRealizado> orcamentosRealizados) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet(ORCAMENTO_REALIZADO_SHEET);
            
            // Cria o cabeçalho
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Material");
            headerRow.createCell(1).setCellValue("Orçamento (ton)");
            headerRow.createCell(2).setCellValue("Orçamento (R$/ton)");
            headerRow.createCell(3).setCellValue("Orçamento (R$)");
            headerRow.createCell(4).setCellValue("Sistema (ton)");
            headerRow.createCell(5).setCellValue("Sistema (R$/ton)");
            headerRow.createCell(6).setCellValue("Sistema (R$)");
            headerRow.createCell(7).setCellValue("Saldo (ton)");
            headerRow.createCell(8).setCellValue("Saldo (R$)");
            headerRow.createCell(9).setCellValue("Diferença (ton)");
            headerRow.createCell(10).setCellValue("Diferença (R$/ton)");
            headerRow.createCell(11).setCellValue("Diferença (R$)");
            
            // Preenche os dados
            int rowNum = 1;
            for (OrçamentoRealizado orcamentoRealizado : orcamentosRealizados) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(orcamentoRealizado.getMaterial() != null ? orcamentoRealizado.getMaterial() : "");
                setCellValue(row.createCell(1), orcamentoRealizado.getOrcamentoTon());
                setCellValue(row.createCell(2), orcamentoRealizado.getOrcamentoCustoPorTon());
                setCellValue(row.createCell(3), orcamentoRealizado.getOrcamentoValorTotal());
                setCellValue(row.createCell(4), orcamentoRealizado.getSistemaTonL());
                setCellValue(row.createCell(5), orcamentoRealizado.getSistemaCustoPorTonL());
                setCellValue(row.createCell(6), orcamentoRealizado.getSistemaValorTotal());
                setCellValue(row.createCell(7), orcamentoRealizado.getSaldoTon());
                setCellValue(row.createCell(8), orcamentoRealizado.getSaldoValor());
                setCellValue(row.createCell(9), orcamentoRealizado.getDiferencaTon());
                setCellValue(row.createCell(10), orcamentoRealizado.getDiferencaCustoPorTon());
                setCellValue(row.createCell(11), orcamentoRealizado.getDiferencaValorTotal());
            }
            
            // Ajusta a largura das colunas
            for (int i = 0; i < 12; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    
    /**
     * Verifica se o arquivo é uma planilha Excel válida
     * @param file Arquivo a ser verificado
     * @return true se for uma planilha Excel válida
     */
    public boolean isExcelFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (
                contentType.equals("application/vnd.ms-excel") ||
                contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        );
    }
    
    // Métodos auxiliares para leitura de células
    
    private String getStringCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return null;
        }
    }
    
    private BigDecimal getBigDecimalCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        
        switch (cell.getCellType()) {
            case NUMERIC:
                return BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING:
                try {
                    return new BigDecimal(cell.getStringCellValue().replace(",", "."));
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }
    
    private void setCellValue(Cell cell, BigDecimal value) {
        if (value != null) {
            cell.setCellValue(value.doubleValue());
        }
    }
}
