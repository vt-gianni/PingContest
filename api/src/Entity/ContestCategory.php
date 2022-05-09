<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContestCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ContestCategoryRepository::class)
 * @ApiResource(
 *     attributes={
 *          "order"={"startDate": "ASC"}
 *     },
 *     normalizationContext={"groups"={"read_category"}},
 * )
 */
class ContestCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read_category", "read_contest"})
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $minPoints;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $maxPoints;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $minAge;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $maxAge;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $onlyMen;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $onlyWomen;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $disability;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $open;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read_category", "read_contest"})
     */
    private $minParticipants;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read_category", "read_contest"})
     */
    private $maxParticipants;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $price;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read_category", "read_contest"})
     */
    private $winPrice;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read_category", "read_contest"})
     */
    private $startDate;

    /**
     * @ORM\ManyToOne(targetEntity=Contest::class, inversedBy="contestCategories")
     * @ORM\JoinColumn(nullable=false)
     */
    private $contest;

    /**
     * @ORM\OneToMany(targetEntity=Participation::class, mappedBy="contestCategory", orphanRemoval=true)
     */
    private $participations;

    /**
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="contestCategory")
     * @Groups({"read_contest"})
     */
    private $media;

    public function __construct()
    {
        $this->participations = new ArrayCollection();
        $this->media = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMinPoints(): ?float
    {
        return $this->minPoints;
    }

    public function setMinPoints(?float $minPoints): self
    {
        $this->minPoints = $minPoints;

        return $this;
    }

    public function getMaxPoints(): ?float
    {
        return $this->maxPoints;
    }

    public function setMaxPoints(?float $maxPoints): self
    {
        $this->maxPoints = $maxPoints;

        return $this;
    }

    public function getMinAge(): ?int
    {
        return $this->minAge;
    }

    public function setMinAge(?int $minAge): self
    {
        $this->minAge = $minAge;

        return $this;
    }

    public function getMaxAge(): ?int
    {
        return $this->maxAge;
    }

    public function setMaxAge(?int $maxAge): self
    {
        $this->maxAge = $maxAge;

        return $this;
    }

    public function getOnlyMen(): ?bool
    {
        return $this->onlyMen;
    }

    public function setOnlyMen(?bool $onlyMen): self
    {
        $this->onlyMen = $onlyMen;

        return $this;
    }

    public function getOnlyWomen(): ?bool
    {
        return $this->onlyWomen;
    }

    public function setOnlyWomen(?bool $onlyWomen): self
    {
        $this->onlyWomen = $onlyWomen;

        return $this;
    }

    public function getDisability(): ?bool
    {
        return $this->disability;
    }

    public function setDisability(?bool $disability): self
    {
        $this->disability = $disability;

        return $this;
    }

    public function getOpen(): ?bool
    {
        return $this->open;
    }

    public function setOpen(?bool $open): self
    {
        $this->open = $open;

        return $this;
    }

    public function getMinParticipants(): ?int
    {
        return $this->minParticipants;
    }

    public function setMinParticipants(int $minParticipants): self
    {
        $this->minParticipants = $minParticipants;

        return $this;
    }

    public function getMaxParticipants(): ?int
    {
        return $this->maxParticipants;
    }

    public function setMaxParticipants(int $maxParticipants): self
    {
        $this->maxParticipants = $maxParticipants;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getWinPrice(): ?int
    {
        return $this->winPrice;
    }

    public function setWinPrice(?int $winPrice): self
    {
        $this->winPrice = $winPrice;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getContest(): ?Contest
    {
        return $this->contest;
    }

    public function setContest(?Contest $contest): self
    {
        $this->contest = $contest;

        return $this;
    }

    /**
     * @return Collection<int, Participation>
     */
    public function getParticipations(): Collection
    {
        return $this->participations;
    }

    public function addParticipation(Participation $participation): self
    {
        if (!$this->participations->contains($participation)) {
            $this->participations[] = $participation;
            $participation->setContestCategory($this);
        }

        return $this;
    }

    public function removeParticipation(Participation $participation): self
    {
        if ($this->participations->removeElement($participation)) {
            // set the owning side to null (unless already changed)
            if ($participation->getContestCategory() === $this) {
                $participation->setContestCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): self
    {
        if (!$this->media->contains($medium)) {
            $this->media[] = $medium;
            $medium->setContestCategory($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): self
    {
        if ($this->media->removeElement($medium)) {
            // set the owning side to null (unless already changed)
            if ($medium->getContestCategory() === $this) {
                $medium->setContestCategory(null);
            }
        }

        return $this;
    }
}
