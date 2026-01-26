enum IdeaCategory {
  Old,
  New
}

enum LikeStatus {
  Like,
  Dislike
}

enum RequestStage {
  Pending=1,
  Accept=2,
  Rejected=3
}
enum KnowledgeType {
  Own,
  General
}

enum ReactionState {
  Liked = 0,
  NotLikedOrDisliked = -1,
  Disliked = 1,
}

enum RequestStatus {
  idle,
  loading,
  succeeded,
  failed
}


export {IdeaCategory,LikeStatus,RequestStage, KnowledgeType,ReactionState,RequestStatus}