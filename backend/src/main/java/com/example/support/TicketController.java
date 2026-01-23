package com.example.support;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketRepository repo;

    public TicketController(TicketRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Ticket> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Ticket create(@RequestBody Ticket t) {
        t.setStatus("OPEN");
        return repo.save(t);
    }

    @PutMapping("/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody Ticket t) {
        Ticket existing = repo.findById(id).orElseThrow(RuntimeException::new);
        existing.setStatus(t.getStatus());
        return repo.save(existing);
    }
}
