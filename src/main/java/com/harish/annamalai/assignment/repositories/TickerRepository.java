package com.harish.annamalai.assignment.repositories;

import com.harish.annamalai.assignment.models.Ticker;
import com.harish.annamalai.assignment.models.TickerId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TickerRepository extends JpaRepository<Ticker, TickerId> {

    List<Ticker> findAllByIndex(String index);

    List<Ticker> findAllByIndexAndTickerDateBetween(String index, Date start, Date end);
}

