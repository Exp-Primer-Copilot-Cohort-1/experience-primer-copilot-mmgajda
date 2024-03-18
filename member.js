function skillsMember() {
  return {
    name: 'skillsMember',
    restrict: 'E',
    templateUrl: 'templates/skills-member.html',
    scope: {
      member: '='
    }
  };
}