package com.example.data1700obligs.repositories;

import com.example.data1700obligs.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByOrderByLastnameAsc();
//    Ticket updateTicketById(Long id);
}