package unpsjb.labprog.backend.model;

import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Horario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    // @OneToMany(mappedBy = "horario")
    // private Collection<Cargo> cargo;
    @ManyToOne
    @JoinColumn(name = "cargo_id")
    private Cargo cargo;

    private String dia;
    private int hora;

}
