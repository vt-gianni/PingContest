<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ClubRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"read_club"}})
 * @ORM\Entity(repositoryClass=ClubRepository::class)
 */
class Club
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read_club", "read_contest"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $city;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read_club", "read_contest"})
     */
    private $creationDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $spid;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read_club", "read_contest"})
     */
    private $picture;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $contactFirstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read_club", "read_contest"})
     */
    private $contactLastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read_club", "read_contest"})
     */
    private $contactPhone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read_club", "read_contest"})
     */
    private $contactMailAddress;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read_club", "read_contest"})
     */
    private $website;

    /**
     * @ORM\OneToMany(targetEntity=Contest::class, mappedBy="club", orphanRemoval=true)
     */
    private $contests;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="club")
     */
    private $users;

    public function __construct()
    {
        $this->contests = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getSpid(): ?string
    {
        return $this->spid;
    }

    public function setSpid(string $spid): self
    {
        $this->spid = $spid;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getContactFirstname(): ?string
    {
        return $this->contactFirstname;
    }

    public function setContactFirstname(string $contactFirstname): self
    {
        $this->contactFirstname = $contactFirstname;

        return $this;
    }

    public function getContactLastname(): ?string
    {
        return $this->contactLastname;
    }

    public function setContactLastname(string $contactLastname): self
    {
        $this->contactLastname = $contactLastname;

        return $this;
    }

    public function getContactPhone(): ?string
    {
        return $this->contactPhone;
    }

    public function setContactPhone(?string $contactPhone): self
    {
        $this->contactPhone = $contactPhone;

        return $this;
    }

    public function getContactMailAddress(): ?string
    {
        return $this->contactMailAddress;
    }

    public function setContactMailAddress(?string $contactMailAddress): self
    {
        $this->contactMailAddress = $contactMailAddress;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    /**
     * @return Collection<int, Contest>
     */
    public function getContests(): Collection
    {
        return $this->contests;
    }

    public function addContest(Contest $contest): self
    {
        if (!$this->contests->contains($contest)) {
            $this->contests[] = $contest;
            $contest->setClub($this);
        }

        return $this;
    }

    public function removeContest(Contest $contest): self
    {
        if ($this->contests->removeElement($contest)) {
            // set the owning side to null (unless already changed)
            if ($contest->getClub() === $this) {
                $contest->setClub(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setClub($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getClub() === $this) {
                $user->setClub(null);
            }
        }

        return $this;
    }
}
