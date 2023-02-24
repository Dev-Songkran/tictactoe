#### Database: `TEST`

```
CREATE DATABASE IF NOT EXISTS `TEST` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
```

#### Table structure for table `games`

```
CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `last_first_player` varchar(255) DEFAULT NULL,
  `win` enum('o','x','draw') DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

```

#### Table structure for table `users`

```
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

```

#### Indexes for table `games`

`` ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`); ``

#### Indexes for table `users`

`` ALTER TABLE `users`
  ADD PRIMARY KEY (`id`); ``

#### AUTO_INCREMENT for table `games`

`` ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; ``

#### AUTO_INCREMENT for table `users`

`` ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; ``

#### Constraints for table `games`

`` ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT; ``
