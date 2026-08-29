export type CinemaReview = {
  id: string;
  movieId: string;
  title: string;
  excerpt: string;
  rating: string;
  image: string;
};

export const cinemaReviews: CinemaReview[] = [
  {
    id: "obsession-review",
    movieId: "obsession",
    title: "Μια σκοτεινή ματιά στην εμμονή",
    excerpt:
      "Μια ταινία που μετατρέπει την επιθυμία σε κάτι σκοτεινό και απρόβλεπτο, δημιουργώντας μια έντονη κινηματογραφική εμπειρία.",
    rating: "8/10",
    image: "/images/cinema/obsession.png",
  },


];