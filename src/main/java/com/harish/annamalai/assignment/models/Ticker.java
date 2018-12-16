package com.harish.annamalai.assignment.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity()
@Table(name = "TICKER")
@Getter
@Setter
@NoArgsConstructor
@ToString
@IdClass(TickerId.class)
public class Ticker {
    @Id
    @Column(name = "TICKER_DATE")
    private Date tickerDate;

    @Id
    @Column(name = "INDEX")
    private String index;

    @Column(name = "OPEN")
    private BigDecimal open;

    @Column(name = "HIGH")
    private BigDecimal high;

    @Column(name = "LOW")
    private BigDecimal low;

    @Column(name = "CLOSE")
    private BigDecimal close;

    @Column(name = "ADJUSTED_CLOSE")
    private BigDecimal adjustedClose;

    @Column(name = "VOLUME")
    private BigDecimal volume;

}
