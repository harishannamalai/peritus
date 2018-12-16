package com.harish.annamalai.assignment.services;

import com.harish.annamalai.assignment.models.Ticker;
import com.harish.annamalai.assignment.repositories.TickerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;

import java.util.Date;

@Service
public class TickerService {

    @Autowired
    private TickerRepository repository;

    public Flux<Ticker> findAllForIndex(String index){

        return Flux.fromIterable(repository.findAllByIndex(index));
    }

    public Flux<Ticker> findAllForIndexBetween(String index, Date start, Date end){
        return Flux.fromIterable(repository.findAllByIndexAndTickerDateBetween(index, start, end));
    }
}
