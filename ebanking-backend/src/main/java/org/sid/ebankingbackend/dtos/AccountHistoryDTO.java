package org.sid.ebankingbackend.dtos;
import lombok.Data;
import java.util.List;


@Data

public class AccountHistoryDTO {

    private String accountId;
    private double balance;
    private int currentOage;
    private int totalPages;
    private int pagesize;
    private List<AccountOperationDTO> accountOperationDTOS;

}
