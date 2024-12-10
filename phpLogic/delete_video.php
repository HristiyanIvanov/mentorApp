<?php
function deleteVideo($videoId) {
    global $pdo;

    // Ensure admin role (you can replace this check with a more robust system)
    if (getCurrentUserId() !== 'admin_id') {
        throw new Exception("Unauthorized action.");
    }

    // Delete video
    $stmt = $pdo->prepare("DELETE FROM videos WHERE id = ?");
    $stmt->execute([$videoId]);

    return "Video deleted successfully.";
}
?>
