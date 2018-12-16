package com.harish.annamalai.assignment.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class TickerId implements Serializable {
    @Id
    @Column(name = "TICKER_DATE")
    private Date tickerDate;

    @Id
    @Column(name = "INDEX")
    private String index;
}
