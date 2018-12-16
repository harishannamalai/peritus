package com.harish.annamalai.assignment.controllers;

import com.harish.annamalai.assignment.models.Ticker;
import com.harish.annamalai.assignment.services.TickerService;
import com.harish.annamalai.assignment.utils.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Date;

@RestController
@RequestMapping("/v1")
public class IndexController {

    Logger logger = LogManager.getLogger(IndexController.class);

    @Autowired
    TickerService service;

    @GetMapping("/indicies/{index}")
    @Transactional(readOnly = true)
    public Flux<Ticker> getAllDataForIndexWithRange(@PathVariable("index") String index,
                                           @RequestParam(value = "from", defaultValue = "") String from,
                                           @RequestParam(value = "to", defaultValue = "") String to){


        Flux<Ticker> tickers = Flux.empty();
        Date start = "".equalsIgnoreCase(from) ? new Date(System.currentTimeMillis()) : Util.getDateFromString(from);
        Date end  = "".equalsIgnoreCase(to) ? new Date(System.currentTimeMillis()) : Util.getDateFromString(to);

        if(start.after(end)){
            Date temp = Util.getDateFromString(Util.getStringFromDate(end));
            end = start;
            start = temp;
        }

        if(index != null && "".equalsIgnoreCase(from) && "".equalsIgnoreCase(to)){
            logger.info("Request Received for fetching Data for " + index);
            tickers = service.findAllForIndex(index);
        }else if(index != null && (!"".equalsIgnoreCase(from) && !"".equalsIgnoreCase(to))) {
            logger.info("Request Received for fetching Data for " + index + " from " + start + " to " + end);
            tickers = service.findAllForIndexBetween(index, start, end);
        }else if(index != null && ("".equalsIgnoreCase(from) || "".equalsIgnoreCase(to))){
            logger.info("Request Received for fetching Data for " + index + " from " + start + " to " + end);
            tickers = service.findAllForIndexBetween(index, start, end);
        }else {
            tickers = Flux.empty();
        }

        return tickers;
    }
}
