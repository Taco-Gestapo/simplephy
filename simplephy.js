var PhysicsEngine = function (canvas) {
    var engine = {};
    
    engine.gravity = 0.3,
        friction = 0.042,
        bounce = true,
        collisions = false,
        actors = [];
        
    engine.addActor = function (actor) {
        actor = actor || {};
        actor.x = (actor.x ? actor.x : 0);
        actor.y = (actor.y ? actor.y : 0);
        actor.vx = (actor.vx ? actor.vx : 0);
        actor.vy = (actor.vy ? actor.vy : 0);
        
    };
};