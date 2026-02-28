const skills = [
    'Video Editing',
    '3D Modeling',
    'Motion Graphics',
    'Color Grading',
    'Visual Effects',
    'Cinematography',
    'After Effects'
];

export default function SkillsMarquee() {
    // Double for seamless loop
    const doubled = [...skills, ...skills];

    return (
        <div className="skills-bar">
            <div className="skills-bar__track">
                {doubled.map((skill, i) => (
                    <span className="skills-bar__item" key={i}>
                        <span className="skills-bar__dot"></span>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
