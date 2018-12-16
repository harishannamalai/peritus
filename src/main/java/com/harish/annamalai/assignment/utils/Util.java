package com.harish.annamalai.assignment.utils;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

public class Util {

    private static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    public static Date getDateFromString(String input){
       Date date = null;
       try{
           date = formatter.parse(input);
       }catch (Exception e){
           e.printStackTrace();
           date = new Date(System.currentTimeMillis());
       }
       return date;
    }

    public static String getStringFromDate (Date input){
        String date = null;
        try{
            date = formatter.format(input);
        }catch (Exception e){
            e.printStackTrace();
            date = formatter.format(System.currentTimeMillis());
        }
        return date;
    }
}
